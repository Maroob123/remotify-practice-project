import { Grid3x3, Inbox, Mail } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  FormControl,
  Grid2,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Pagination,
  Select,
  TablePagination,
  Toolbar,
  Typography,
} from "@mui/material";
import { CustomCard } from "../components";
import axiosInstance from "../config/axiosInstance";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
const drawerWidth = 240;

const fetchJobListing = async (title, company_name, itemPerPage) => {
  const response = await axiosInstance.get(`/remote-jobs`, {
    params: {
      category: title,
      company_name: company_name,
      limit: itemPerPage,
    },
  });
  return response.data;
};

const fetchCategories = async () => {
  const response = await axiosInstance.get(`/remote-jobs/categories`);
  return response.data;
};

function Home() {
  const [itemPerPage, setItemPerPage] = useState(25);
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(0);

  const { data, isPending, isError, isFetching } = useQuery({
    queryKey: ["companies", title, itemPerPage],
    queryFn: () => fetchJobListing(title, itemPerPage),
    keepPreviousData: true,
  });

  const {
    data: categoriesData,
    isPending: isLoading,
    isFetching: isCategoriesFetching,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
    keepPreviousData: true,
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeItemPerPage = (event) => {
    setItemPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto", p: 2, pt: 4 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="job-title">Title</InputLabel>
              <Select
                labelId="job-title"
                id="job-title-dropdown"
                value={title}
                label="Title"
                onChange={(event) => setTitle(event.target.value)}
              >
                {categoriesData?.map((item) => {
                  <MenuItem value={item?.jobs?.slug} key={item?.jobs?.id}>
                    {item?.jobs?.name}
                  </MenuItem>;
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={10}
                label="Age"
                onChange={() => {}}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={10}
                label="Age"
                onChange={() => {}}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6, md: 4, lg: 3 }}>
              <CustomCard />
            </Grid2>
          </Grid2>
          <Box>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data ? data?.total : 0}
              rowsPerPage={itemPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeItemPerPage}
            />{" "}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Home;
