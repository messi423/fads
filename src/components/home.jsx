import React from 'react';
import { useState, useEffect } from 'react';
import { authAxios } from "../utils";
import {useDispatch, useSelector} from 'react-redux';
import { Card, Avatar, Space, Divider } from 'antd';

import {
  userDetail,adList
} from "../utils";
import axios from 'axios';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const HomePage = (props) => {
    
    let [ads, setAds] = useState([]);
    const dispatch = useDispatch();
    const auth = useSelector(state=>state.auth);
    const luser = auth.user;

    useEffect(()=>{
        authAxios.get(adList)
        .then(res=>{
            ads = setAds(res.data.data);
            console.log(ads[0].attributes.title);
            console.log(ads);
        })
        .catch(err => {
            console.log(err);
        })
      }, [!ads]);

    

    return(
        <div>
            
            <Space direction="vertical" style={{marginTop:"50px"}}>
            <h2>All Advertisements</h2>
                {ads.map((ad) => {
                return (
                    <div>
                    
                  <li key={ad.id}>
                      <Link to={`/ads/${ad.id}`}>
                      <Card
                        style={{ width: 300 }}
                        cover={
                        <img
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                        }
                       >
                        <Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={ad.attributes.title}
                        description={ad.attributes.body}
                        />
                    </Card>
                    </Link>
                    <Space/>
                  </li>
                  <Divider/>
                  </div>
                );
              })}
            </Space>
        </div>
    );
}

export default HomePage;
