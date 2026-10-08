const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-12 py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs md:text-sm text-gray-600">
        {/* বামপাশের টেক্সট */}
        <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>

        {/* ডানপাশের টেক্সট */}
        <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
      </div>
    </footer>
  );
};

export default Footer;