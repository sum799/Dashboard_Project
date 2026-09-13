// File header: Profile menu and avatar dropdown. Handles account actions like
// opening profile, signing out, and controlling menu state. It is rendered in
// the AppBar and must remain lightweight to avoid blocking the header.
import { PropsWithChildren, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Link,
  ListItemIcon,
  MenuItem,
  MenuItemProps,
  SnackbarCloseReason,
  Stack,
  SxProps,
  Typography,
  listClasses,
  listItemIconClasses,
  paperClasses,
} from '@mui/material';
import Menu from '@mui/material/Menu';
import { users } from 'data/users';
import { clearStoredAuthUser, getStoredAuthUser } from 'lib/googleAuth';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import StatusAvatar from 'components/base/StatusAvatar';
import ProSnackbar from './ProSnackbar';
import UserProfileDialog from './UserProfileDialog';

interface ProfileMenuItemProps extends MenuItemProps {
  icon: string;
  href?: string;
  sx?: SxProps;
  disabled?: boolean;
}

const ProfileMenu = ({ disabled = false }: { disabled?: boolean }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!getStoredAuthUser());
  const authUser = useMemo(() => {
    const storedUser = getStoredAuthUser();
    if (!storedUser) {
      return null;
    }

    return {
      ...(storedUser as Record<string, string | number>),
      name: String(storedUser.name ?? 'Guest'),
      email: String(storedUser.email ?? 'guest@mail.com'),
      avatar: storedUser.avatar ? String(storedUser.avatar) : undefined,
      designation: storedUser.designation ? String(storedUser.designation) : undefined,
    };
  }, [isAuthenticated]);

  const currentUser = authUser || demoUser;

  useEffect(() => {
    setIsAuthenticated(!!getStoredAuthUser());
  }, [anchorEl]);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const handleSnackbarClose = (_event: SyntheticEvent, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const handleSignOut = () => {
    clearStoredAuthUser();
    setIsAuthenticated(false);
    handleClose();

    if (typeof window !== 'undefined') {
      window.location.replace(paths.root);
    }
  };

  const [profileOpen, setProfileOpen] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<Record<string, any> | null>(null);

  const handleOpenProfile = async () => {
    handleClose();
    setProfileLoading(true);
    setProfileError(null);
    setProfileData(null);

    const stored = getStoredAuthUser();
    const userId = String(stored?.User_ID ?? stored?.name ?? stored?.email ?? '');

    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbw_duSZjS-6MaZ4R8YTeN-_He-Xs7Od_Rnn2b9jvqXSfzglqMyFlAugkjM5kARtpz0m/exec',
        {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({ API_Key: '123456789', User_ID: userId }),
        },
      );

      const result = await response.json();

      if (result?.status === 'success') {
        setProfileData(result.data ?? null);
      } else {
        setProfileError(result?.message ?? 'Failed to fetch profile');
      }
    } catch (err: any) {
      setProfileError(err?.message ?? String(err));
    } finally {
      setProfileLoading(false);
      setProfileOpen(true);
    }
  };

  const menuButton = (
    <Button
      color="neutral"
      variant="text"
      shape="circle"
      onClick={handleClick}
      sx={{
        height: 44,
        width: 44,
      }}
    >
      <StatusAvatar
        alt={currentUser.name}
        status="online"
        src={currentUser.avatar ?? undefined}
        sx={{
          width: 40,
          height: 40,
          border: 2,
          borderColor: 'background.paper',
        }}
      />
    </Button>
  );
  return (
    <>
      {menuButton}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
        slotProps={{
          paper: {
            sx: {
              minWidth: 320,
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: '0 20px 40px rgba(187, 216, 107, 0.12)',
            },
          },
        }}
        sx={{
          [`& .${paperClasses.root}`]: { minWidth: 320 },
          [`& .${listClasses.root}`]: { py: 0 },
        }}
      >
        <Stack
          sx={{
            alignItems: 'center',
            gap: 2,
            px: 3,
            py: 2,
          }}
        >
          <StatusAvatar
            status="online"
            alt={currentUser.name}
            src={currentUser.avatar ?? undefined}
            sx={{ width: 48, height: 48 }}
          />
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                mb: 0.5,
              }}
            >
              {currentUser.name}
            </Typography>
            {currentUser.designation && (
              <Typography
                variant="subtitle2"
                sx={{
                  color: 'warning.main',
                }}
              >
                {currentUser.designation}
                <IconifyIcon
                  icon="material-symbols:diamond-rounded"
                  color="warning.main"
                  sx={{ verticalAlign: 'text-bottom', ml: 0.5 }}
                />
              </Typography>
            )}
          </Box>
        </Stack>
        <Divider />
        <Box sx={{ py: 1 }}>
          <ProfileMenuItem icon="material-symbols:accessible-forward-rounded" onClick={handleClose}>
            Accessibility
          </ProfileMenuItem>

          <ProfileMenuItem
            icon="material-symbols:settings-outline-rounded"
            onClick={handleClose}
            disabled={disabled}
          >
            Preferences
          </ProfileMenuItem>
        </Box>
        <Divider />
        <Box sx={{ py: 1 }}>
          <ProfileMenuItem
            icon="material-symbols:manage-accounts-outline-rounded"
            onClick={handleOpenProfile}
            href="#!"
            disabled={disabled}
          >
            Account Settings
          </ProfileMenuItem>
          <ProfileMenuItem
            icon="material-symbols:question-mark-rounded"
            onClick={handleClose}
            href="#!"
            disabled={disabled}
          >
            Help Center
          </ProfileMenuItem>
        </Box>
        <Divider />
        <Box sx={{ py: 1 }}>
          {isAuthenticated ? (
            <ProfileMenuItem onClick={handleSignOut} icon="material-symbols:logout-rounded">
              Sign Out
            </ProfileMenuItem>
          ) : (
            <ProfileMenuItem href={paths.login} icon="material-symbols:login-rounded">
              Sign In
            </ProfileMenuItem>
          )}
        </Box>
      </Menu>
      <ProSnackbar open={snackbarOpen} onClose={handleSnackbarClose} />
      <UserProfileDialog
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        loading={profileLoading}
        error={profileError}
        data={profileData}
      />
    </>
  );
};

const ProfileMenuItem = ({
  icon,
  onClick,
  children,
  href,
  sx,
  disabled = false,
}: PropsWithChildren<ProfileMenuItemProps>) => {
  const linkProps = href ? { component: Link, href, underline: 'none' } : {};
  return (
    <MenuItem onClick={onClick} {...linkProps} disabled={disabled} sx={{ gap: 1, ...sx }}>
      <ListItemIcon
        sx={{
          [`&.${listItemIconClasses.root}`]: { minWidth: 'unset !important' },
        }}
      >
        <IconifyIcon icon={icon} sx={{ color: 'text.secondary' }} />
      </ListItemIcon>
      {children}
    </MenuItem>
  );
};

export default ProfileMenu;

const demoUser = {
  id: 0,
  email: 'guest@mail.com',
  name: 'Guest',
  avatar: users[13].avatar,
  designation: 'Merchant Captian ',
};
