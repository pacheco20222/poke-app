// =============================================================================
// WHAT: Language Toggle Button - Switches between English and Spanish
// WHY: Allow users to change app language with one click
// =============================================================================

import { IconButton, Tooltip } from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import { useLanguage } from '../../contexts/LanguageContext';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Tooltip title={language === 'en' ? 'Switch to Spanish' : 'Cambiar a inglés'}>
      <IconButton
        onClick={toggleLanguage}
        color="inherit"
        sx={{
          border: '1px solid rgba(255, 255, 255, 0.3)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <TranslateIcon />
      </IconButton>
    </Tooltip>
  );
}
