"use client";
import React, { useContext, useState } from "react";
import { useParams } from "next/navigation";
import { DataContext } from "@/contexts/post";
import {
  Grid,
  Typography,
  Paper,
  Box,
  Card,
  CardMedia,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Update from "../Update";

function Page() {
  const { id } = useParams();
  const { detail, data } = useContext(DataContext);

  // Filter details based on postId
  const filteredDetails = detail?.filter((item) => item.postId == id);

  // Filter images from data based on id
  const filteredData = data?.filter((item) => item.id == id);

  // Modal open state and selected detail and data IDs
  const [open, setOpen] = useState(false);
  const [selectedDetailId, setSelectedDetailId] = useState(null);
  const [selectedDataId, setSelectedDataId] = useState(null);

  // Handle opening the modal and setting the selected detail and data IDs
  const handleUpdate = (detailId, dataId) => {
    setSelectedDetailId(detailId);
    setSelectedDataId(dataId);
    setOpen(true);
  };

  // Handle closing the modal
  const handleClose = () => {
    setOpen(false);
    setSelectedDetailId(null);
    setSelectedDataId(null); // Reset selected IDs
  };

  const handleDelete = () => {
    console.log("Delete button clicked");
  };

  return (
    <Box p={4}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Post Details
          </Typography>
        </Grid>

        {/* Property Details Section */}
        {filteredDetails?.length > 0 ? (
          filteredDetails.map((item, key) => (
            <Grid item xs={12} md={6} key={key}>
              <Paper elevation={4} sx={{ padding: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6" fontWeight="bold">
                      Property Details
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Construction Year:</strong> {item.constructionyear}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Surface:</strong> {item.surface} m²
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Rooms:</strong> {item.rooms}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Bedrooms:</strong> {item.bathrooms}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Floor:</strong> {item.floor}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Kitchen:</strong> {item.kitchen}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Furnished:</strong> {item.furnished ? "Yes" : "No"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Elevator:</strong> {item.elevator ? "Yes" : "No"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Parking:</strong> {item.parking ? "Available" : "Not Available"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Balcony:</strong> {item.balcony ? "Yes" : "No"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Pool:</strong> {item.pool ? "Yes" : "No"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      <strong>Facade:</strong> {item.facade}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      <strong>Documents:</strong> {item.documents}
                    </Typography>
                  </Grid>
                </Grid>

                {/* Action Buttons for each item */}
                <Box display="flex" justifyContent="flex-end" mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdate(item.id, id)} // Pass detail.id and data.id to the handleUpdate function
                    sx={{ mr: 2 }}
                  >
                    Update
                  </Button>
                  <Button variant="outlined" color="error" onClick={handleDelete}>
                    Delete
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1">No details found for this post.</Typography>
          </Grid>
        )}

        {/* Images Section */}
        {filteredData?.length > 0 ? (
          filteredData.map((item, key) => (
            <Grid item xs={12} key={key}>
              <Paper elevation={4} sx={{ padding: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Images
                </Typography>
                <Grid container spacing={3}>
                  {item.img && item.img.length > 0 ? (
                    item.img.map((imageUrl, imgKey) => (
                      <Grid item xs={12} sm={6} md={4} key={imgKey}>
                        <Card sx={{ boxShadow: 3 }}>
                          <CardMedia
                            component="img"
                            height="400"
                            width="500"
                            image={imageUrl}
                            alt={`Image ${imgKey}`}
                            sx={{ borderRadius: 2 }}
                          />
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <Typography variant="body2">No images found.</Typography>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1">No images found for this post.</Typography>
          </Grid>
        )}

        {/* Update Modal */}
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>Update Details</DialogTitle>
          <DialogContent>
            {/* Passing selectedDetailId and selectedDataId to the Update component */}
            <Update detailId={selectedDetailId} dataId={selectedDataId} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Box>
  );
}

export default Page;
