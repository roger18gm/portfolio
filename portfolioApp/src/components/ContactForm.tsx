import { Box, Button, FormLabel, Grid, OutlinedInput, styled, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
  }));

const ContactForm = () => {
  return (
    <Box sx={{margin: {md: '2rem 8rem', lg: '2rem 18rem'}}}>
      <form action="https://formsubmit.co/34ce7fee137ae5acbd08363526f61269" method="POST">
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_subject" value="New submission!" />
        <input type="hidden" name="_autoresponse" value="Thank you for reaching out. I'll get back to you as soon as possible."/>
        <Typography variant="h5" textAlign={"center"}>
          Get in touch with me.
        </Typography>
        <Grid spacing={3}>
          <FormGrid size={{xs: 12, md: 6}} >
              <FormLabel htmlFor="full-name" required>Full Name</FormLabel>
              <OutlinedInput 
              id="full-name"
              label="Message"
              name="full-name"
              type="name"
              placeholder="Roger Galan"
              required
              />
          </FormGrid>
          <FormGrid size={{xs: 12, md: 6}} paddingTop={2}>
              <FormLabel htmlFor="email-address" required>Email Address</FormLabel>
              <OutlinedInput 
              id="email-address"
              name="email-address"
              type="email"
              placeholder="email@address.com"
              required
              />
          </FormGrid>
          <FormGrid size={{xs: 12, md: 6}} paddingTop={2}>
              <FormLabel htmlFor="message" required>Enter a Message</FormLabel>
              <TextField 
              id="message"
              // label="Message"
              multiline
              rows={4}
              name="message"
              type="text"
              placeholder="Enter message here..."
              required
              />
          </FormGrid>
          <Box paddingTop={5}>
            <Button
              variant="contained"
              type="submit"
              size="large"
              endIcon={<SendIcon />}
              fullWidth
              >
              Send Message
            </Button>
          </Box>
        </Grid>
      </form>
    </Box>

  );
}

export default ContactForm
