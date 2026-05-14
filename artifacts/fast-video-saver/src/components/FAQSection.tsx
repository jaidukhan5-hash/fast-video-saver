import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is Fast Video Saver free to use?",
    answer: "Yes, Fast Video Saver is completely free to use. There are no hidden fees, subscriptions, or premium tiers. You can download as many videos as you want without paying anything."
  },
  {
    question: "Which platforms are supported?",
    answer: "We support downloading videos from all major platforms including YouTube, TikTok, Instagram, Twitter/X, Facebook, Vimeo, and many more."
  },
  {
    question: "Can I download in HD quality?",
    answer: "Absolutely! We provide the highest available quality for the video you're downloading, including 1080p, 4K, and 8K options whenever the original source supports it."
  },
  {
    question: "Is it safe to use?",
    answer: "Yes, our tool is 100% safe. We don't require you to install any software, and we don't store your downloaded videos on our servers. Your privacy and security are our top priorities."
  },
  {
    question: "Do I need to create an account?",
    answer: "No registration is required. You can start downloading videos immediately without providing any personal information or creating an account."
  },
  {
    question: "How long does it take to download?",
    answer: "The download processing typically takes just a few seconds. The actual file download time depends on the video size and your internet connection speed."
  },
  {
    question: "Can I use it on my phone?",
    answer: "Yes! Fast Video Saver is fully optimized for mobile devices. It works perfectly on both iOS and Android browsers without needing a dedicated app."
  },
  {
    question: "Are there any download limits?",
    answer: "There are no daily limits on how many videos you can download. You can use our service as much as you need."
  }
];

export function FAQSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Everything you need to know about Fast Video Saver.</p>
        </div>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-black/20 border border-white/5 rounded-lg px-6 data-[state=open]:border-primary/30 transition-colors"
            >
              <AccordionTrigger className="text-left text-white font-medium hover:no-underline hover:text-primary transition-colors py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
