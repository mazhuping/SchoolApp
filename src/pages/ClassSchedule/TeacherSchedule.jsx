import React, {Component} from 'react';
import { Modal, Button,Select } from 'antd';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import {FormElement} from '@/library/antd';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';


import config from '@/commons/config-hoc';
import PageContent from '@/layouts/page-content';
import styles from './style.less'
import {Form} from "antd/lib/index";
const { confirm } = Modal;
const { Option } = Select;

@config({
    ajax: true,
    path: '/TeacherSchedule',
    connect(state) {
        return {local: state.system.i18n.roles}
    }
})

export default  class TeacherSchedule extends Component {
    calendarComponentRef = React.createRef();

    state = {
        loading: false,
        schoolOptions:[],
        // calendarWeekends: true,
        calendarEvents: [ // initial event data
            { title: 'Event Now', start: new Date() }
        ]
    };

    componentDidMount() {

        this.getSchoolOptions();

    }

    componentDidUpdate(prevProps) {

    }

    getSchoolOptions=()=> {
        this.setState({loading: true});
        const options = [];
        // this.props.ajax
        //     .get('/getAllSchool')
        //     .then(res => {
        //
        //         res.forEach(item=>{
        //             options.push(<Option value={item.SchoolID}>{item.SchooName}</Option>);
        //         })
        //     })
        //     .finally(() => this.setState({loading: false,schoolOptions:options}))

        //测试数据
        for (let i = 10; i < 36; i++) {
            options.push(<Option value={i.toString(36) + i}>{i.toString(36) + i}</Option>);
        }
        this.setState({loading: false, schoolOptions: options});
    }

    // toggleWeekends = () => {
    //     this.setState({ // update a property
    //         calendarWeekends: !this.state.calendarWeekends
    //     })
    // }
    //
    gotoPast = () => {
        let calendarApi = this.calendarComponentRef.current.getApi();
        calendarApi.gotoDate('2000-01-01') // call a method on the Calendar object
        // calendarApi.addEventSource( source ) //Source may be an Array/URL/Function just as in the events option
    }
    //
    // handleDateClick = (arg) => {
    //     if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
    //         this.setState({  // add new event data
    //             calendarEvents: this.state.calendarEvents.concat({ // creates a new array
    //                 title: 'New Event',
    //                 start: arg.date,
    //                 allDay: arg.allDay
    //             })
    //         })
    //     }
    // }

    render() {
        const {
            loading,
            schoolOptions
        } = this.state;
        const FormElement = this.FormElement;
        return (
            <PageContent loading={loading}>

                <div className={styles["demo-app"]}>
                    {/*<div className={styles["demo-app-top"]}>*/}
                        {/*/!*<button onClick={ this.toggleWeekends }>toggle weekends</button>&nbsp;*!/*/}
                        {/*/!*<button onClick={ this.gotoPast }>go to a date in the past</button>&nbsp;*!/*/}
                        {/*/!*(also, click a date/time to add an event)*!/*/}


                    {/*</div>*/}
                    <div className={styles["demo-app-calendar"]}>
                        <Select
                            showSearch
                            style={{ width: 400,marginBottom:10 }}
                            placeholder="Select a person"
                            optionFilterProp="children"
                            // onChange={onChange}
                            // onFocus={onFocus}
                            // onBlur={onBlur}
                            // onSearch={onSearch}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {schoolOptions}
                        </Select>
                        <FullCalendar
                            defaultView="dayGridMonth"
                            header={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                            }}
                            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                            ref={ this.calendarComponentRef }
                            // weekends={ this.state.calendarWeekends }
                            events={ this.state.calendarEvents }
                            dateClick={ this.handleDateClick }
                        />
                    </div>
                </div>
            </PageContent>

        );

    }


}