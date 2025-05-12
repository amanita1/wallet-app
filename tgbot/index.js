const TelegramBot = require('node-telegram-bot-api')
const fs = require('fs')
const path = require('path')

const token = '8167797090:AAEfwyvInWgGqW8wfnxFTZJ2Fi8UfCJo3Rw'
const bot = new TelegramBot(token, { polling: true })

const configPath = path.join(__dirname, '../shared/config.json')
const dbPath = path.join(__dirname, '../db.json')

// 💾 Утилиты
const getConfig = () => JSON.parse(fs.readFileSync(configPath, 'utf8'))
const getTransactions = () => {
    if (!fs.existsSync(dbPath)) return []
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'))
    return db.transactions || []
}
const saveTransaction = tx => {
    const db = fs.existsSync(dbPath)
        ? JSON.parse(fs.readFileSync(dbPath, 'utf8'))
        : { transactions: [] }

    db.transactions = [...(db.transactions || []), tx]
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2))
}

// 📍 /start
bot.onText(/\/start/, msg => {
    const name = msg.from.first_name || 'друг'
    const chatId = msg.chat.id

    bot.sendMessage(chatId, `
👋 Привет, ${name}!

Я — бот для добавления транзакций в твой кошелёк 💸

📌 Примеры:
  /add доход 50000 зп премия  
  /add расход 1500 еда шаурма

Команды:
/add [доход|расход] [сумма] [категория] [комментарий]
/list — последние 10 транзакций
/balance — баланс, цель и лимит
  `)
})

// ➕ /add команда
bot.onText(/\/add (доход|расход) (\d+)\s+(\S+)(.*)?/, (msg, match) => {
    const chatId = msg.chat.id
    const type = match[1] === 'доход' ? 'income' : 'expense'
    const amount = parseFloat(match[2])
    const category = match[3]
    const comment = match[4]?.trim() || ''

    const tx = {
        id: Date.now(),
        type,
        amount,
        category,
        date: new Date().toISOString().split('T')[0],
        comment,
    }

    saveTransaction(tx)

    bot.sendMessage(chatId, `✅ Добавлено: ${type} ₸${amount} [${category}]`)
})

// 📄 /list
bot.onText(/\/list/, msg => {
    const chatId = msg.chat.id
    const list = getTransactions()

    if (list.length === 0) return bot.sendMessage(chatId, 'Пока нет транзакций.')

    const last = list.slice(-10).reverse()
    const text = last
        .map(tx => {
            const emoji = tx.type === 'income' ? '➕' : '➖'
            return `${emoji} ₸${tx.amount} — ${tx.category} (${tx.date})${tx.comment ? `\n📝 ${tx.comment}` : ''}`
        })
        .join('\n\n')

    bot.sendMessage(chatId, `🧾 Последние транзакции:\n\n${text}`)
})

// 📊 /balance
bot.onText(/\/balance/, msg => {
    const chatId = msg.chat.id
    const config = getConfig()
    const list = getTransactions()

    const income = list.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
    const expense = list.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
    const balance = income - expense

    const savingGoal = config.savingGoal || 0
    const salaryDate = config.salaryDate || null
    const today = new Date()
    const payday = salaryDate ? new Date(salaryDate) : new Date(today)
    const daysLeft = Math.max(Math.ceil((payday - today) / (1000 * 60 * 60 * 24)), 1)

    const available = Math.max(balance - savingGoal, 0)
    const dailyLimit = Math.floor(available / daysLeft)

    const text = `
💰 Balance: ₸${balance}
🎯 Goal: ₸${savingGoal}
📅 Days until salary: ${daysLeft}
📊 Daily limit: ₸${dailyLimit}
  `

    bot.sendMessage(chatId, text)
})
