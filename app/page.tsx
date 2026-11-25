import Link from "next/link";
import MessageComposer from "@/app/message-composer";

export default function HomePage() {
  return (
    <main className="shell">
      <header className="topbar"><Link className="brand" href="/">গোপন বার্তা</Link><span className="secure-label">🔒 ব্যক্তিগতভাবে এনক্রিপ্ট করা</span></header>
      <section className="hero">
        <p className="eyebrow">PRIVATE NOTES, SHARED SAFELY</p>
        <h1>একটি বার্তা লিখুন।<br /><span>নিরাপদে শেয়ার করুন।</span></h1>
        <p className="intro">আপনার বার্তা ব্রাউজারেই এনক্রিপ্ট হয়। লিংক যার কাছে থাকবে, শুধু সে-ই এটি পড়তে পারবে—মেয়াদ শেষ হলে বার্তাটি মুছে যাবে।</p>
        <MessageComposer />
        <p className="privacy-note">🔐 আপনার encryption key আমাদের সার্ভারে পাঠানো হয় না। লিংকটি যার সঙ্গে শেয়ার করবেন, সে বার্তাটি পড়তে পারবে।</p>
      </section>
      <footer>সাধারণ টেক্সট বার্তা শেয়ার করার জন্য তৈরি। সংবেদনশীল বা জরুরি তথ্যের একমাত্র কপি হিসেবে ব্যবহার করবেন না।</footer>
    </main>
  );
}
