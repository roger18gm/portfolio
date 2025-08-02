import { Card, CardContent, Skeleton, Box } from "@mui/material";

const SkeletonCard = () => (
  <Card sx={{ mb: 4, minWidth: 275 }}>
    <CardContent>
      <Skeleton animation="wave" variant="text" width="60%" height={32} />
      <Skeleton animation="wave" variant="text" width="40%" height={24} />
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="100%"
        height={40}
        sx={{ my: 1 }}
      />
      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
        <Skeleton animation="wave" variant="circular" width={32} height={32} />
        <Skeleton animation="wave" variant="circular" width={32} height={32} />
        <Skeleton animation="wave" variant="circular" width={32} height={32} />
      </Box>
    </CardContent>
  </Card>
);

export default SkeletonCard;
