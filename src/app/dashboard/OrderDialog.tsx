import React, { useState, useEffect, ChangeEvent, useContext } from 'react';
import { Select, MenuItem, InputLabel, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, SelectChangeEvent } from '@mui/material';
import { DataContext } from '@/contexts/post';

interface AddOrderDialogProps {
  open: boolean;
  onClose: () => void;
  selectedPostId?: string; // Optional prop to accept postId from another component
  category: string;
}
interface Post {
  id: string;
  title: string;
  status: string;
  category: {
    name: string;
  };
}

const AddOrderDialog: React.FC<AddOrderDialogProps> = ({ open, onClose, selectedPostId, category }) => {
  const [newCustomer, setNewCustomer] = useState({
    fullName: '',
    dateDebut: '',
    dateFine: '',
    price: '',
    CIN: '',
    postId: selectedPostId || '', // Initialize with selectedPostId if provided
  });
  const { data } = useContext(DataContext) as { data: Post[] };

  useEffect(() => {
    if (selectedPostId) {
      setNewCustomer((prevState) => ({
        ...prevState,
        postId: selectedPostId,
      }));
    }
  }, [selectedPostId]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewCustomer({
      ...newCustomer,
      [event.target.name]: event.target.value,
    });
  };

  const handlePostChange = (event: SelectChangeEvent<string>) => {
    setNewCustomer({ ...newCustomer, postId: event.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/DateReserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCustomer),
      });

      if (!response.ok) {
        throw new Error('Failed to save the order');
      }

      const result = await response.json();
      console.log('Order saved successfully:', result);
      onClose(); // Close the dialog after successful save
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  // Filter data to show only the selected post if selectedPostId exists
  const filteredData = selectedPostId
    ? data.filter((item: Post) => item.id === selectedPostId)
    : data.filter((item: Post) => item.status !== 'unavailable' && item.status !== 'taken');

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Order</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          name="fullName"
          fullWidth
          variant="outlined"
          value={newCustomer.fullName}
          onChange={handleChange}
        />
        {category === 'Location' && (
          <>
            <TextField
              margin="dense"
              label="dateDebut"
              name="dateDebut"
              type="date"
              fullWidth
              variant="outlined"
              value={newCustomer.dateDebut}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="dense"
              label="dateFine"
              name="dateFine"
              type="date"
              fullWidth
              variant="outlined"
              value={newCustomer.dateFine}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </>
        )}
        <TextField
          margin="dense"
          label="CIN"
          name="CIN"
          fullWidth
          variant="outlined"
          value={newCustomer.CIN}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="price"
          name="price"
          type="number"
          fullWidth
          variant="outlined"
          value={newCustomer.price}
          onChange={handleChange}
        />
        <InputLabel style={{ marginLeft: '10px' }}>Select available Post</InputLabel>
        <Select
          fullWidth
          variant="outlined"
          value={newCustomer.postId}
          onChange={handlePostChange}
        >
          {filteredData.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.title}
              <span style={{ color: 'red', marginLeft: '10px' }}>
                {item.status} {item.category.name}
              </span>
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOrderDialog;
