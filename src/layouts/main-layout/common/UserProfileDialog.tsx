import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
  loading?: boolean;
  error?: string | null;
  data?: Record<string, any> | null;
}

const UserProfileDialog = ({ open, onClose, loading, error, data }: Props) => {
  const HEADER_HEIGHT = 72; // match the app header height so backdrop starts below it

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      BackdropProps={{
        sx: {
          top: `${HEADER_HEIGHT}px`,
          backgroundColor: 'rgba(10, 15, 25, 0.56)',
          backdropFilter: 'blur(6px)',
        },
      }}
      PaperProps={{
        sx: {
          mt: `${HEADER_HEIGHT + 8}px`,
          backgroundColor: '#ffffff',
          color: '#000000',
          borderRadius: 2,
          boxShadow: '0 12px 40px rgba(0,0,0,0.16)',
          overflow: 'hidden',
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          backgroundColor: '#ffffff',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          py: 2,
        }}
      >
        Account Settings
      </DialogTitle>
      <DialogContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : !data ? (
          <Typography>No data available.</Typography>
        ) : (
          <Box sx={{ backgroundColor: '#ffffff', borderRadius: 1, p: 2 }}>
            <Table>
              <TableBody>
                {Object.keys(data).map((key) => (
                  <TableRow key={key}>
                    <TableCell sx={{ fontWeight: 700, width: '40%' }}>{key}</TableCell>
                    <TableCell>{String(data[key] ?? '')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ backgroundColor: '#ffffff', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserProfileDialog;
