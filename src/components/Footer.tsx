export default function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        <p className="text-text-muted text-sm">
          جميع الحقوق محفوظة © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
