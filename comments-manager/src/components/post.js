import React, { useEffect, useState } from 'react';
import { Button, Card, CardHeader, CardBody, CustomInput, Input } from 'reactstrap';
import { useParams } from 'react-router-dom';

const Post = () => {
  const params = useParams();
  const { id } = params;

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [filterBy, setFilterBy] = useState('');
  const [searchText, setSearchText] = useState('');

  const fetchData = async () => {
    let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

    if (response.ok) {
      let json = await response.json();
      console.log('GET POST', json);
      if (json) setPost(json);
    } else {
      alert('HTTP-Error: ' + response.status);
    }
  };

  const fetchComments = async (isFilter) => {
    let url = `https://jsonplaceholder.typicode.com/comments?postId=${id}`;

    if (isFilter) url = `${url}&${filterBy}=${searchText}`;

    let response = await fetch(url);

    if (response.ok) {
      let json = await response.json();
      console.log('GET COMMENTS', json);
      if (json && Array.isArray(json)) setComments(json);
    } else {
      alert('HTTP-Error: ' + response.status);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
      fetchComments();
    }
  }, []);

  const handleSubmit = () => {
    fetchComments(true);
  };

  if (!id || !post) return <div>No post found.</div>;

  return (
    <div className="text-left">
      <div className="mt-4">
        <h5>
          <u>Post Details Page</u>
        </h5>
        <div className="mt-4">
          <h6>{post.title}</h6>
          <p>{post.body}</p>
        </div>
        <div className="mt-4 ml-5 mr-5">
          <h6>
            <u>Comments</u>
          </h6>
          <div className="ml-3 w-50">
            Filter comments by:
            <CustomInput
              type="select"
              id="filterBy"
              name="filterBy"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option value="">Select filter criteria</option>
              {['name', 'email', 'body'].map((text, i) => {
                return (
                  <option value={text} key={i}>
                    {text}
                  </option>
                );
              })}
            </CustomInput>
          </div>
          <div className="mt-3 ml-3 w-50">
            Enter search text
            <Input
              name="searchText"
              value={searchText}
              placeholder="Search here..."
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button onClick={handleSubmit} className="mt-3">
              Search
            </Button>
            <Button onClick={() => fetchComments()} className="mt-3 ml-2">
              Reset
            </Button>
          </div>
          {comments.map((item, i) => (
            <Card className="mt-3" key={item.id}>
              <CardHeader>
                <span>{item.email}</span>
                <span className="float-right">{`#${i + 1}`}</span>
              </CardHeader>
              <CardBody>
                <div className="mb-2">{`Name: ${item.name}`}</div>
                <div className="ml-3 mr-3">{item.body}</div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
