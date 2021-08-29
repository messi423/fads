import React, {Component} from 'react';
import { useState, useEffect } from 'react';
import { authAxios } from "../utils";
import {useDispatch, useSelector} from 'react-redux';
import { Card, Avatar, Space, Comment, List, Divider } from 'antd';
import {
  adId,adList, comment
} from "../utils";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { render } from '@testing-library/react';

const { Meta } = Card;


const CommentForm = (adId) => {

    const dispatch = useDispatch();
    const auth = useSelector(state=>state.auth);
    const luser = auth.user;

    const onFinish = (values) => {
        console.log('Success:', values);
        authAxios
        .post(comment, {
            user_id: luser.id,
            ad_id: adId, 
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

    return(
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
    );
}



class AdDeatail extends Component {

    state={
        addc: false,
        user_id: null, 
        comment: "",
        comments = [],
        ads: [],
    }

    componentDidMount(){
        const id = this.props.match.params.adId;
        authAxios
        .get(`http://127.0.0.1:5000/api/v1/ads/${id}/`)
        .then(res=>{
            setAds(res.data.data);
            setComments(res.data.included);
            //console.log(ads[0].attributes.title);
            console.log(ad);
            console.log(res);
            console.log(comments);
        })
        .catch(err => {
            console.log(err);
        })
    }


    componentDidUpdate(prevState, prevprops) {
        const {  } = this.state;
        if (!!this.state.addc) {
            this.fetchUser();
            console.log("jasnjcknsdlnkdjskjnsa,");
            this.setState({ component_update: false, ad_address: !ad_address });
        }
    }

    render() {
        return (
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
                <List
                    className="comment-list"
                    header={`${comments.length} replies`}
                    itemLayout="horizontal"
                    dataSource={comments}
                    renderItem={item => (
                    <li>
                    <Comment content={item} />
                    </li>
                    )}
                />
                <Divider type="horizontal" />
                   <Button type="primary" onClick={()=>setAddc(!addc)}>
                    Add Comment
                    </Button>
                <Divider type="horizontal" />
                {
                    addc && <CommentForm/>
                }
            </Card>
        </div>
        );
    }


}
export default AdDeatail;
