import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: Mail, href: "mailto:hello@example.com", label: "Email", color: "cyan" },
  { icon: Github, href: "https://github.com", label: "GitHub", color: "violet" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", color: "blue" },
];

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header - blur to clear
      gsap.fromTo(
        "[data-contact-header]",
        { y: 40, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Social icons - staggered pop-in
      gsap.fromTo(
        "[data-social-icon]",
        { scale: 0, opacity: 0, rotation: -20 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Form inputs - slide in from left
      gsap.fromTo(
        "[data-form-input]",
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
          },
        }
      );

      // Submit button - pulse effect
      gsap.to("[data-submit-btn]", {
        boxShadow: "0 0 30px hsla(180, 80%, 50%, 0.3)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    // Simulate sending
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setSending(false);
      (e.target as HTMLFormElement).reset();
    }, 1200);
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 px-4 sm:px-6 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-2xl">
        {/* Section Header */}
        <div data-contact-header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-sm font-mono text-muted-foreground">Available for work</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
            Have a project in mind or just want to chat? Feel free to reach out. I'm always open to discussing new opportunities.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-10">
          {socialLinks.map((link) => (
            <Button
              key={link.label}
              data-social-icon
              variant="ghost"
              size="icon"
              asChild
              className={`h-14 w-14 rounded-full border border-white/10 bg-card/50 backdrop-blur-xl hover:scale-110 hover:shadow-lg transition-all duration-300 hover:border-${link.color}-500/50 hover:shadow-${link.color}-500/20`}
            >
              <a
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                aria-label={link.label}
                className={`flex items-center justify-center hover:text-${link.color}-400`}
              >
                <link.icon className="h-5 w-5" />
              </a>
            </Button>
          ))}
        </div>

        {/* Glassmorphic Form Container */}
        <div className="relative">
          {/* Glow effects */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-blue-500/20 blur-xl opacity-50" />

          {/* Form card */}
          <div className="relative rounded-2xl bg-card/80 backdrop-blur-xl border border-white/10 p-6 sm:p-8">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              {/* Name Input */}
              <div data-form-input className="relative group">
                <Input
                  placeholder="Your Name"
                  required
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  className={`h-14 bg-secondary/30 border-white/10 backdrop-blur-sm placeholder:text-muted-foreground/50 focus:border-cyan-500/50 focus:ring-cyan-500/20 transition-all duration-300 ${
                    focused === "name" ? "shadow-[0_0_20px_hsla(180,80%,50%,0.15)]" : ""
                  }`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity">
                  <div className="w-1.5 h-8 bg-gradient-to-b from-cyan-500 to-violet-500 rounded-full" />
                </div>
              </div>

              {/* Email Input */}
              <div data-form-input className="relative group">
                <Input
                  type="email"
                  placeholder="Your Email"
                  required
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  className={`h-14 bg-secondary/30 border-white/10 backdrop-blur-sm placeholder:text-muted-foreground/50 focus:border-cyan-500/50 focus:ring-cyan-500/20 transition-all duration-300 ${
                    focused === "email" ? "shadow-[0_0_20px_hsla(180,80%,50%,0.15)]" : ""
                  }`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity">
                  <div className="w-1.5 h-8 bg-gradient-to-b from-cyan-500 to-violet-500 rounded-full" />
                </div>
              </div>

              {/* Message Textarea */}
              <div data-form-input className="relative group">
                <Textarea
                  placeholder="Your Message"
                  rows={5}
                  required
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  className={`resize-none bg-secondary/30 border-white/10 backdrop-blur-sm placeholder:text-muted-foreground/50 focus:border-cyan-500/50 focus:ring-cyan-500/20 transition-all duration-300 ${
                    focused === "message" ? "shadow-[0_0_20px_hsla(180,80%,50%,0.15)]" : ""
                  }`}
                />
                <div className="absolute top-3 right-0 flex items-start pr-3 pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity">
                  <div className="w-1.5 h-8 bg-gradient-to-b from-cyan-500 to-violet-500 rounded-full" />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                data-submit-btn
                type="submit"
                disabled={sending}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-600 hover:from-cyan-500 hover:via-blue-500 hover:to-violet-500 border-0 shadow-[0_0_30px_hsla(180,80%,50%,0.2)] hover:shadow-[0_0_40px_hsla(180,80%,50%,0.3)] transition-all duration-500 group"
              >
                {sending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    Send Message
                  </div>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Additional contact info */}
        <div className="text-center mt-8 space-y-2" data-contact-header>
          <p className="text-muted-foreground text-sm">
            Prefer email directly?
          </p>
          <a
            href="mailto:hello@example.com"
            className="text-cyan-400 font-mono text-sm hover:underline transition-all duration-300 hover:text-cyan-300"
          >
            hello@example.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
