import "./footer.css";

export default function InvestifyFooter() {
  return (
    <footer className="investify-footer">

      {/* Newsletter Section */}
      <div className="newsletter-card">
        <h2>Stay Ahead of the Market</h2>
        <p>
          Get investment insights, market trends, and portfolio strategies
          delivered directly to your inbox.
        </p>

        <div className="newsletter-form">
          <input placeholder="Enter your email address" />
          <button>Subscribe</button>
        </div>
      </div>


      {/* Main Footer */}
      <div className="footer-grid">

        {/* Brand */}
        <div className="footer-brand">
          <h3>Investify</h3>
          <p>
            A modern investment platform designed to help individuals
            grow wealth through data-driven insights and intelligent tools.
          </p>
        </div>


        {/* Product */}
        <div className="footer-col">
          <h4>Product</h4>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#security">Security</a>
          <a href="#updates">Updates</a>
        </div>


        {/* Company */}
        <div className="footer-col">
          <h4>Company</h4>
          <a href="#about">About</a>
          <a href="#careers">Careers</a>
          <a href="#blog">Blog</a>
          <a href="#contact">Contact</a>
        </div>


        {/* Legal */}
        <div className="footer-col">
          <h4>Legal</h4>
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Cookies</a>
        </div>

      </div>


      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Investify. All rights reserved.</p>

        <div className="socials">
          
        </div>
      </div>

    </footer>
  );
}