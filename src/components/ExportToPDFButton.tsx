import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { useSelector } from 'react-redux'
import type {RootState} from '../redux/store'

export default function ExportToPDFButton() {
    const transactions = useSelector((state: RootState) => state.transactions.list)
    const { savingGoal, salaryDate, age, name } = useSelector((state: RootState) => state.auth)

    const generatePDF = () => {
        const doc = new jsPDF()

        doc.setFont('helvetica')
        doc.setFontSize(16)
        doc.text('Wallet Report', 14, 20)

        doc.setFontSize(10)
        doc.text(`Name: ${name || '—'}`, 14, 30)
        doc.text(`Age: ${age || '—'}`, 14, 35)
        doc.text(`Saving Goal: ₸${savingGoal || 0}`, 14, 40)
        doc.text(`Next Salary Date: ${salaryDate || '—'}`, 14, 45)

        doc.setFontSize(12)
        doc.text('Transactions:', 14, 55)

        autoTable(doc, {
            startY: 60,
            head: [['Type', 'Category', 'Amount', 'Date', 'Comment']],
            body: transactions.map(tx => [
                tx.type === 'income' ? 'Income' : 'Expense',
                tx.category,
                `₸${tx.amount}`,
                tx.date,
                tx.comment || '',
            ]),
            styles: {
                fontSize: 9,
            },
        })

        doc.save('wallet-report.pdf')
    }

    return (
        <button
            onClick={generatePDF}
            className="hover:scale-105 active:scale-95 transition duration-200 mt-8 w-full py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition font-semibold"
        >
            📄 Скачать PDF отчёт
        </button>
    )
}
