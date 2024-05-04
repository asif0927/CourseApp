import React, { useEffect,useState } from 'react';
import { useContext } from 'react';
import { Mycontext } from "../context/Mycontext";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Loading from './Loading';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const Course = () => {
  const { loading, courses,setCourses, fetchedData } = useContext(Mycontext);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
  }, [refreshing]);

  const handleClick =(id)=>{
      const filtereditem=courses.filter((course) => course._id !== id);
      setCourses(filtereditem);
  }
  const handleRefresh = () => {
    setRefreshing(true);
    fetchedData();
    setRefreshing(false);
  };

  return (
    <>
      {loading ? (
        <Loading/>
      ) : (
        courses.length===0 ?(
        <>
        <div style={{marginBottom:"15px"}}>Bütün kurslar silindi</div>
        <Button variant="contained" style={{marginBottom:"15px"}} onClick={() => handleRefresh()}>Yenilə</Button>
        </>
      ):
        <>
        <Button variant="contained" style={{marginBottom:"15px"}} onClick={() => handleRefresh()}>Yenilə</Button>
        <Grid container spacing={2}>
          {courses.map(course => (
            <Grid key={course._id} item xs={12} sm={6} md={4}>
              <Card sx={{ minWidth: 275 }} className='card'>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {course.name}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {course.price} &#x20bc;
                  </Typography>
                  <Typography variant="body2">
                    {course.description}
                  </Typography>
                  <Button variant="contained" color="error" style={{marginTop:"20px"}} onClick={() => handleClick(course._id)}>Sil</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        </>
      )}
    </>
  );
}

export default Course;

