export default function Footer() {
    return (
        <footer
            className="w-full text-center py-6 text-sm text-gray-500 dark:text-gray-400 border-t dark:border-gray-700 mt-12
                 animate-fade-in"
        >
            <p>
                Сделано лучшим студентом{' '}
                <span className="font-semibold text-indigo-500">Рахметовым Александром</span>
            </p>

            <div className="flex justify-center gap-4 flex-wrap text-sm mt-2">
                <a
                    href="https://github.com/amanita1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400"
                >
                    GitHub
                </a>

                <a
                    href="https://www.linkedin.com/in/alexander-rakhmetov-3189502b2/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400"
                >
                    LinkedIn
                </a>

                <a
                    href="mailto:35357@iitu.edu.kz"
                    className="hover:underline text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400"
                >
                    35357@iitu.edu.kz
                </a>
            </div>
        </footer>
    )
}
