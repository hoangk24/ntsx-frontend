import React from 'react';
import {Avatar, Button, Comment, Form, Input, Modal, Space} from "antd";

function ChatClient() {
    const {TextArea} = Input
    return (
        <Modal visible={true} title={'Hỗ trợ trực tiếp'} footer={false}>
            <Form>
                <Space>
                    <div>
                        <Comment
                            avatar={<Avatar src={""}/>}
                            author={"Admin"}
                            content={"Chào bạn"}/>
                        <Comment
                            avatar={<Avatar src={""}/>}
                            author={"Admin"}
                            content={"Chào bạn"}/>
                        <Comment
                            avatar={<Avatar src={""}/>}
                            author={"Admin"}
                            content={"Chào bạn"}/>
                        <Comment
                            style={{
                                marginRight: 'auto'
                            }}
                            avatar={<Avatar src={""}/>}
                            author={"Admin"}
                            content={"Chào bạn"}/>
                    </div>
                </Space>

                <Form.Item>
                    <TextArea/>
                </Form.Item>
                <Form.Item>
                    <Button>Gửi</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default ChatClient;