import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-[100dvh] flex flex-col page-transition">
      <Helmet>
        <title>Terms of Service - Fast Video Saver</title>
        <meta name="description" content="Terms of Service for Fast Video Saver. Read our terms of use before using our video downloading tool." />
        <link rel="canonical" href="https://fastvideosaver.app/terms" />
      </Helmet>

      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-16 max-w-4xl">
        <div className="glass-card p-8 md:p-12 prose prose-invert prose-blue max-w-none">
          <h1 className="text-4xl font-bold mb-4 text-white">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using Fast Video Saver ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use our Service.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Use of Service</h2>
            <p>Fast Video Saver provides a web-based tool allowing users to download videos from publicly accessible websites. The Service is provided "as is" and is intended for personal, non-commercial use only.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Prohibited Uses</h2>
            <p>You agree not to use the Service:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-muted-foreground">
              <li>In any way that violates any applicable national or international law or regulation.</li>
              <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
              <li>To download copyrighted material without explicit permission from the copyright owner.</li>
              <li>To engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Service.</li>
              <li>To attempt to bypass or circumvent any security measures of the Service.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Intellectual Property & Copyright</h2>
            <p className="text-white font-medium">Fast Video Saver strictly respects intellectual property rights and expects its users to do the same.</p>
            <p className="mt-4">Users are solely responsible for ensuring they have the legal right to download, store, and use any media obtained through our Service. We do not host any of the downloaded files on our servers. The Service merely acts as a conduit between the user and the publicly available media source.</p>
            <p className="mt-4">Any download of copyrighted material without the explicit consent of the copyright owner is strictly prohibited and is the sole responsibility of the user.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. Disclaimer of Warranties</h2>
            <p>The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We disclaim all warranties of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
            <p className="mt-4">We make no warranty that the Service will meet your requirements, or that the Service will be uninterrupted, timely, secure, or error-free.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">6. Limitation of Liability</h2>
            <p>In no event shall Fast Video Saver, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">7. Governing Law</h2>
            <p>These Terms shall be governed and construed in accordance with the laws, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">8. Changes to Terms</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">9. Contact</h2>
            <p>If you have any questions about these Terms, please contact us at legal@fastvideosaver.app.</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
