import { Facebook, Instagram, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex h-[50px] items-center justify-between">
          {/* Copyright */}
          <div className="text-sm text-gray-600 dark:text-gray-400 arabic-font">
            © 2025 جميع الحقوق محفوظة
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <a
              href="#"
              className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="فيسبوك"
            >
              <Facebook className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </a>
            <a
              href="#"
              className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="إنستغرام"
            >
              <Instagram className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </a>
            <a
              href="#"
              className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="تويتر"
            >
              <Twitter className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

