import React, {Component} from 'react';
import { useState, useEffect } from 'react';
import { authAxios } from "../utils";
import {useDispatch, useSelector} from 'react-redux';
import { Card, Avatar, Space, Comment, List, Divider, Button, Form, Input } from 'antd';
import {
  adId,adList, comment
} from "../utils";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { render } from '@testing-library/react';

const { Meta } = Card;



const AdDeatail = (props) => {
    
    const [ad, setAds] = useState([]);
    const [comments, setComments] = useState();
    const dispatch = useDispatch();
    const auth = useSelector(state=>state.auth);
    const luser = auth.user;
    const [addc, setAddc] = useState(false);
    //const [id, setId] = useState(null);


    const onFinish = (values) => {
        console.log('Success:', values);
        const id = props.match.params.adId;
        authAxios
        .post(comment, {
            user_id: luser.id,
            ad_id: id, 
            text: values.text
        })
        .then(res=>{
            console.log(res.data.data);
        })
        .catch(err=>{
            console.log(err);
        })
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    useEffect(()=>{
        const id = props.match.params.adId;
        authAxios
        .get(`http://127.0.0.1:5000/api/v1/ads/${id}/`)
        .then(res=>{
            // console.log(ad);
            setAds(ad => [...ad, res.data.data]);
            //setComments(comments=>comments=res.data.included);
            console.log(ad);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])
    

    return(
        <div>
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
                //title={ad.attributes.title}
                //description={ad.attributes.body}
                />
                <Divider type="horizontal" />
                {/* <List
                    className="comment-list"
                    header={`${comments.length} replies`}
                    itemLayout="horizontal"
                    dataSource={comments}
                    renderItem={item => (
                    <li>
                    <Comment content={item} />
                    </li>
                    )}
                /> */}
                <Divider type="horizontal" />
                   <Button type="primary" onClick={()=>setAddc(!addc)}>
                    Add Comment
                    </Button>
                <Divider type="horizontal" />
                {
                    addc && (
                        <Form
                        name="basic"
                        onFinish={onFinish}
                        >

                        <Form.Item
                            label="Comment"
                            name="text"
                            rules={[
                            {
                                required: true,
                                message: 'Enter Comment!',
                            },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                            Post Comment
                            </Button>
                        </Form.Item>
                    </Form>
                    )
                }
            </Card>
        </div>
    );
}

export default AdDeatail;
