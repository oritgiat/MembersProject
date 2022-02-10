import { Time } from "@angular/common"

export class MeetingModule
{
    meeting_id :number
    group_id :number
    date :Date//לשאול את המורה מאיזה סוג זה תאריך
    purpose :string
    initiastor_id :string
    place :string
    done :string
    summary :string
    time:Time
    aproval:boolean
    reminder:boolean
    name:string
}