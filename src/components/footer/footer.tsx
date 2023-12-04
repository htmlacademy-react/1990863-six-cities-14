import { memo } from 'react';
import Logo from '../logo/logo';

function FooterComponent(): JSX.Element {
  return(
    <footer className="footer container">
      <Logo />
    </footer>
  );
}

const Footer = memo(FooterComponent);
export default Footer;
