export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 h-16 flex items-center justify-center text-sm text-gray-500">
        © {new Date().getFullYear()} everlink.fun
      </div>
    </footer>
  )
}
