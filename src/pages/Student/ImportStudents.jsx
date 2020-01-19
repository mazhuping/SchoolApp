import React, {Component} from 'react';
import config from '@/commons/config-hoc';
import PageContent from '@/layouts/page-content';
import { Upload, Icon, message,Button } from 'antd';

const { Dragger } = Upload;

@config({
    ajax: true,
    path: '/ImportStudents',
    connect(state) {
        return {local: state.system.i18n.roles}
    }
})

export default class ImportStudents  extends Component {
    state = {
        loading: false,
    };

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }


    render() {
        const {
            loading,
        } = this.state;

        const props = {
            name: 'file',
            multiple: true,
            action: "",
            onChange(info) {
                const { status } = info.file;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        return (
            <PageContent loading={loading}>
                <div style={{marginBottom:10}}>
                    <form method="get" action="http(s)://下载文件的后台接口">
                        <Button type="submit" icon="download" size="Default">
                            下载模板
                        </Button>
                    </form>

                </div>
                <div style={{height:"50%"}}>
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                            band files
                        </p>
                    </Dragger>
                </div>

            </PageContent>

        );

    }


}