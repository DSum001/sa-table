export interface BookingInterface {

    ID?: number; // รหัสการจอง (auto-generated)
    number_of_customers?: number; // จำนวนลูกค้า
    soups?: number[]; // รหัสซุปที่เลือก (ถ้ามี)
    package_id?: number; // รหัสแพ็คเกจ
    table_id?: number; // รหัสโต๊ะ
    member_id?: number; // รหัสสมาชิก
    employee_id?: number; // รหัสพนักงาน
}