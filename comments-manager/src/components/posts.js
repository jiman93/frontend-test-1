import React, { useEffect, useState } from 'react';
import { Button, Card, CardHeader, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

library.add(faArrowRight);

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');

    if (response.ok) {
      let json = await response.json();
      console.log('JSON', json);
      if (json && Array.isArray(json)) setPosts(json);
    } else {
      alert('HTTP-Error: ' + response.status);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="Posts" className="text-left">
      <div className="mt-4">
        <h5>
          <u>List of posts</u>
        </h5>
        {posts.map((item) => (
          <Card key={item.id} className="mt-3">
            <CardHeader>
              <span>{item.title}</span>

              <Link
                to={() => {
                  return {
                    pathname: `/post/${item.id}`,
                  };
                }}
              >
                <Button className="float-right" size="sm">
                  <FontAwesomeIcon icon="arrow-right" />
                </Button>
              </Link>
            </CardHeader>
            <CardBody>{item.body}</CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Posts;
