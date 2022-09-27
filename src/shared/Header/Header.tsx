import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import styles from './styles';

const Header = () => {
  return (
    <header>
      <Box sx={styles.filler} />
      <Box sx={styles.headerWrapper}>
        <Container sx={styles.header} maxWidth="lg">
          <Link to="/">Test App</Link>
          <Link to="/remixes">Remixes</Link>
        </Container>
      </Box>
    </header>
  );
};

export default Header;
