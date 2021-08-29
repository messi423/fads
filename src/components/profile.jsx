import React from 'react';
import { authAxios } from "../utils";
import {useDispatch, useSelector} from 'react-redux';
import {
  userDetail,adList
} from "../utils";
import axios from 'axios';

const ProfilePage = (props) => {
    
    let ads = []
    const dispatch = useDispatch();
    const auth = useSelector(state=>state.auth);
    const luser = auth.user;

    authAxios.get(adList)
    .then(res=>{
        ads = res.data.data;
    })
    .catch(err => {
        console.log(err);
    })

    return(
        <div>
            {
                ads.filter(ad => ad.attributes.user_id === luser.id).map(fad => (
                    <li>
                        {fad}
                    </li>
                ))
            }
        </div>
    );
}

export default ProfilePage;