import React from 'react';
import { authAxios } from "../utils";
import {useDispatch, useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
import { Card, Avatar, Space } from 'antd';

import { Link } from 'react-router-dom';
import {
  userDetail,adList
} from "../utils";
import axios from 'axios';
const { Meta } = Card;


const ProfilePage = () => {
    
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
    },[!ads])

    return(
        <div>
            <h2>Profile </h2>
                {ads.filter(fad => fad.attributes.user_id === luser.id).map((ad) => {
                    return (
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
                    );
                  })}
        </div>
    );
}

export default ProfilePage;