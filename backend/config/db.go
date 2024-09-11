package config

import (

    "fmt"
    "github.com/DSum001/sa-table/entity"
    "gorm.io/driver/sqlite"
    "gorm.io/gorm"

)

var db *gorm.DB
func DB() *gorm.DB {
    return db
}

func ConnectionDB() {

    database, err := gorm.Open(sqlite.Open("sa.db?cache=shared"), &gorm.Config{})
    if err != nil {
        panic("failed to connect database")
    }

    fmt.Println("connected database")
    db = database

}

func SetupDatabase() {

    db.AutoMigrate(
        
        &entity.Booking{},
        &entity.Table{},
        &entity.TableCapacity{},
        &entity.TableStatus{},
        &entity.Soup{},
        &entity.Package{},
        &entity.Employee{},
        &entity.Member{},
        
    )

    TableFourSeat1 := entity.Table{TableName: "F1", TableStatusID: 1, TableCapacityID: 1}
    TableFourSeat2 := entity.Table{TableName: "F2", TableStatusID: 1, TableCapacityID: 1}
    TableFourSeat3 := entity.Table{TableName: "F3", TableStatusID: 1, TableCapacityID: 1}
    TableFourSeat4 := entity.Table{TableName: "F4", TableStatusID: 1, TableCapacityID: 1}
    TableFourSeat5 := entity.Table{TableName: "F5", TableStatusID: 2, TableCapacityID: 1}
    TableFourSeat6 := entity.Table{TableName: "F6", TableStatusID: 2, TableCapacityID: 1}
    TableSixSeat1 := entity.Table{TableName: "S1", TableStatusID: 1, TableCapacityID: 2}
    TableSixSeat2 := entity.Table{TableName: "S2", TableStatusID: 1, TableCapacityID: 2}
    TableSixSeat3 := entity.Table{TableName: "S3", TableStatusID: 1, TableCapacityID: 2}
    TableSixSeat4 := entity.Table{TableName: "S4", TableStatusID: 3, TableCapacityID: 2}
    TableEightSeat1 := entity.Table{TableName: "E1", TableStatusID: 3, TableCapacityID: 3}
    TableEightSeat2 := entity.Table{TableName: "E2", TableStatusID: 1, TableCapacityID: 3}
    
    StatusAvailable := entity.TableStatus{Status: "Available"}
    StatusNotAvailable := entity.TableStatus{Status: "Not Available"}
    StatusReserved := entity.TableStatus{Status: "Reserved"}
    
    CapacityFour := entity.TableCapacity{MinCustomer: 1, MaxCustomer: 4}
    CapacitySix := entity.TableCapacity{MinCustomer: 5, MaxCustomer: 6}
    CapacityEight := entity.TableCapacity{MinCustomer: 7, MaxCustomer: 8}

    Soup1 := entity.Soup{Name: "น้ำใส"}
    Soup2 := entity.Soup{Name: "น้ำดำ"}
    Soup3 := entity.Soup{Name: "ซุปหม่าล่า", Price: 12}
    Soup4 := entity.Soup{Name: "ซุปทงคัตสึ", Price: 12}
    
    Package_pork_chicken := entity.Package{Name: "หมู,ไก่", Price: 179, Point: 50}
    Package_seafood := entity.Package{Name: "ทะเล", Price: 249, Point: 100}
    Package_beef := entity.Package{Name: "เนื้อ", Price: 279, Point: 150}

    
    db.FirstOrCreate(&TableFourSeat1, &entity.Table{TableName: "F1", TableStatusID: 1, TableCapacityID: 1})
    db.FirstOrCreate(&TableFourSeat2, &entity.Table{TableName: "F2", TableStatusID: 1, TableCapacityID: 1})
    db.FirstOrCreate(&TableFourSeat3, &entity.Table{TableName: "F3", TableStatusID: 1, TableCapacityID: 1})
    db.FirstOrCreate(&TableFourSeat4, &entity.Table{TableName: "F4", TableStatusID: 1, TableCapacityID: 1})
    db.FirstOrCreate(&TableFourSeat5, &entity.Table{TableName: "F5", TableStatusID: 2, TableCapacityID: 1})
    db.FirstOrCreate(&TableFourSeat6, &entity.Table{TableName: "F6", TableStatusID: 2, TableCapacityID: 1})
    db.FirstOrCreate(&TableSixSeat1, &entity.Table{TableName: "S1", TableStatusID: 1, TableCapacityID: 2})
    db.FirstOrCreate(&TableSixSeat2, &entity.Table{TableName: "S2", TableStatusID: 1, TableCapacityID: 2})
    db.FirstOrCreate(&TableSixSeat3, &entity.Table{TableName: "S3", TableStatusID: 1, TableCapacityID: 2})
    db.FirstOrCreate(&TableSixSeat4, &entity.Table{TableName: "S4", TableStatusID: 3, TableCapacityID: 2})
    db.FirstOrCreate(&TableEightSeat1, &entity.Table{TableName: "E1", TableStatusID: 3, TableCapacityID: 3})
    db.FirstOrCreate(&TableEightSeat2, &entity.Table{TableName: "E2", TableStatusID: 1, TableCapacityID: 3})
    
    
    db.FirstOrCreate(&StatusAvailable, &entity.TableStatus{Status: "Available"})
    db.FirstOrCreate(&StatusNotAvailable, &entity.TableStatus{Status: "Not Available"})
    db.FirstOrCreate(&StatusReserved, &entity.TableStatus{Status: "Reserved"})
    
    db.FirstOrCreate(&CapacityFour, &entity.TableCapacity{MinCustomer: 1, MaxCustomer: 4})
    db.FirstOrCreate(&CapacitySix, &entity.TableCapacity{MinCustomer: 5, MaxCustomer: 6})
    db.FirstOrCreate(&CapacityEight, &entity.TableCapacity{MinCustomer: 7, MaxCustomer: 8})

    db.FirstOrCreate(&Soup1, &entity.Soup{Name: "น้ำใส"})
    db.FirstOrCreate(&Soup2, &entity.Soup{Name: "น้ำดำ"})
    db.FirstOrCreate(&Soup3, &entity.Soup{Name: "ซุปหม่าล่า", Price: 12})
    db.FirstOrCreate(&Soup4, &entity.Soup{Name: "ซุปทงคัตสึ", Price: 12})

    db.FirstOrCreate(&Package_pork_chicken, &entity.Package{Name: "หมู,ไก่", Price: 179, Point: 50})
    db.FirstOrCreate(&Package_seafood, &entity.Package{Name: "ทะเล", Price: 249, Point: 100})
    db.FirstOrCreate(&Package_beef, &entity.Package{Name: "เนื้อ", Price: 279, Point: 150})

    hashedPassword, _ := HashPassword("123456")
    employee := &entity.Employee {

        FirstName: "shubaba",
        LastName:  "booboo",
        Email: "shabu@gmail.com",
        Gender_id: 1,
        Position_id: 1,
        Password: hashedPassword,

    }

    db.FirstOrCreate(employee, &entity.Employee{Email: "shabu@gmail.com",})
}