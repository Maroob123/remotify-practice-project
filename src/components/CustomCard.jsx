import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

import DOMPurify from "dompurify";

export default function CustomCard(data) {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={data?.company_logo} alt={data?.company_name} />}
        title={`${data?.title} - ${data?.company_name}`}
        subheader={`${data?.publication_date?.replace("T", " ")}`}
      />
      <CardContent>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary" }}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data?.description),
          }}
        ></Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
