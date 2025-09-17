import {BsFillSunFill, BsFillMoonFill} from 'react-icons/bs'
import Wrapper from '../wrappers/ThemeToggle'
import { useDashboardContext } from '../../pages/DashboardLayout'
const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useDashboardContext();
  return (
    <Wrapper>
      <button
        type="button"
        className="toggle-btn toggle-icon"
        onClick={toggleDarkTheme}
      >
        {isDarkTheme ? (
          <BsFillSunFill />
        ) : (
          <BsFillMoonFill  />
        )}
      </button>
    </Wrapper>
  );
}

export default ThemeToggle