import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-[100dvh] flex flex-col page-transition">
      <Helmet>
        <title>Privacy Policy - Fast Video Saver</title>
        <meta name="description" content="Privacy Policy for Fast Video Saver. Learn how we collect, use, and protect your data." />
        <link rel="canonical" href="https://fastvideosaver.app/privacy-policy" />
      </Helmet>

      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-16 max-w-4xl">
        <div className="glass-card p-8 md:p-12 prose prose-invert prose-blue max-w-none">
          <h1 className="text-4xl font-bold mb-4 text-white">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Information We Collect</h2>
            <p>At Fast Video Saver, your privacy is our priority. We collect minimal information to provide and improve our service. The information we may collect includes:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-muted-foreground">
              <li><strong>Log Data:</strong> Like many website operators, we collect information that your browser sends whenever you visit our site. This may include your computer's IP address, browser type, browser version, pages visited, time and date of visit, and other statistics.</li>
              <li><strong>Device Information:</strong> We may collect information about the device you are using to access our service.</li>
              <li><strong>Usage Data:</strong> We track the URLs you submit for download strictly for processing purposes. We do not store these URLs or link them to your identity.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. How We Use Information</h2>
            <p>We use the collected information for various purposes:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-muted-foreground">
              <li>To provide and maintain our service</li>
              <li>To detect, prevent and address technical issues</li>
              <li>To monitor the usage of our service</li>
              <li>To improve user experience and interface design</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Cookies</h2>
            <p>We use cookies and similar tracking technologies to track the activity on our service and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier.</p>
            <p className="mt-4">You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Third-Party Services & AdSense</h2>
            <p>We may employ third-party companies and individuals to facilitate our service, to provide the service on our behalf, or to assist us in analyzing how our service is used.</p>
            <p className="mt-4"><strong>Google AdSense:</strong> We use Google AdSense to serve ads. Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of the DART cookie enables it to serve ads to our users based on their visit to our site and other sites on the Internet. Users may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. Your Rights</h2>
            <p>Depending on your location, you may have certain rights regarding your personal data, including:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-muted-foreground">
              <li>The right to access, update or delete the information we have on you</li>
              <li>The right of rectification</li>
              <li>The right to object</li>
              <li>The right of restriction</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">6. Changes to Policy</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">7. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at privacy@fastvideosaver.app.</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
