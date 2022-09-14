export interface TableItem {
    org_id?: string,
    org_name: string,
    org_code: string,
    org_type: string,
    describe?: string,
    parent_id?: string
    status: string,
    created_time?: Date,
    update_time?: Date,
    leader?: string,
    founder?: string,
}