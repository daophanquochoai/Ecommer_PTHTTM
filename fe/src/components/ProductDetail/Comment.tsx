import React, {useEffect} from 'react';
import {Avatar, Card, Rate} from "antd";
import { LikeOutlined } from '@ant-design/icons';
const actions: React.ReactNode[] = [
    <LikeOutlined key={'like'} />
];

type Props = {
    content : string,
    star : number,
    image : string,
    name : string
}
const Comment : React.FC = (props : Props) => {


    return (
        <div className={'p-4'}>
            <div>
                {/*<div className={'grid grid-cols-[1fr_3fr] '}>*/}
                {/*    <div className={'items-center justify-center flex'}>*/}
                {/*        <img className={' rounded-full w-[20%] h-[20#]'} src={'https://www.vlance.vn/uploads/portfolio/view/c4a875224357fa0f1dce59defcb7a42b3d6d2cab1.jpg'} alt={''}/>*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*        <div>Very good</div>*/}
                {/*        <Rate disabled defaultValue={4} />*/}
                {/*    </div>*/}
                {/*</div>*/}
                <Card>
                    <Card.Meta
                        avatar={<Avatar src={props.image} />}
                        title={props.content}
                        description={
                            <>
                                <p>{props.name}</p>
                                <Rate disabled defaultValue={props.star} />
                            </>
                        }
                    />
                </Card>
            </div>
        </div>
    );
};

export default Comment ;