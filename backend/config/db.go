package config

import (

    "fmt"
    //"time"
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

        &entity.TableStatus{},
        &entity.Position{},
        &entity.Soup{},
        &entity.Package{},
        &entity.Employee{}, 
        &entity.Member{},
        &entity.Gender{},

    )

    StatusAvailable := entity.TableStatus{Status: "Available"}
    StatusBusy := entity.TableStatus{Status: "Busy"}
    StatusNotReady := entity.TableStatus{Status: "Not Ready"}

    Position_boss := entity.Position{Position: "Boss"}
    Position_staff1 := entity.Position{Position: "staff1"}
    Position_staff2 := entity.Position{Position: "staff2"}
    Position_staff3 := entity.Position{Position: "staff3"}
    Position_staff4 := entity.Position{Position: "staff4"}

    GenderMale := entity.Gender{Gender: "Male"}
    GenderFemale := entity.Gender{Gender: "Female"}

    Soup1 := entity.Soup{Name: "น้ำใส"}
    Soup2 := entity.Soup{Name: "น้ำดำ"}
    Soup3 := entity.Soup{Name: "ซุปหม่าล่า"}
    Soup4 := entity.Soup{Name: "ซุปทงคัตสึ"}
    
    Package_pork_chicken := entity.Package{Name: "หมู, ไก่"}
    Package_seafood := entity.Package{Name: "ทะเล"}
    Package_beef := entity.Package{Name: "เนื้อ"}

    db.FirstOrCreate(&StatusAvailable, &entity.TableStatus{Status: "Available"})
    db.FirstOrCreate(&StatusBusy, &entity.TableStatus{Status: "Busy"})
    db.FirstOrCreate(&StatusNotReady, &entity.TableStatus{Status: "Not Ready"})

    db.FirstOrCreate(&GenderMale, &entity.Gender{Gender: "Male"})
    db.FirstOrCreate(&GenderFemale, &entity.Gender{Gender: "Female"})

    db.FirstOrCreate(&Position_boss, &entity.Position{Position: "Boss"})
    db.FirstOrCreate(&Position_staff1, &entity.Position{Position: "staff1"})
    db.FirstOrCreate(&Position_staff2, &entity.Position{Position: "staff2"})
    db.FirstOrCreate(&Position_staff3, &entity.Position{Position: "staff3"})
    db.FirstOrCreate(&Position_staff4, &entity.Position{Position: "staff4"})

    db.FirstOrCreate(&Soup1, &entity.Soup{Name: "น้ำใส"})
    db.FirstOrCreate(&Soup2, &entity.Soup{Name: "น้ำดำ"})
    db.FirstOrCreate(&Soup3, &entity.Soup{Name: "ซุปหม่าล่า"})
    db.FirstOrCreate(&Soup4, &entity.Soup{Name: "ซุปทงคัตสึ"})

    db.FirstOrCreate(&Package_pork_chicken, &entity.Package{Name: "หมู, ไก่"})
    db.FirstOrCreate(&Package_seafood, &entity.Package{Name: "ทะเล"})
    db.FirstOrCreate(&Package_beef, &entity.Package{Name: "เนื้อ"})

    hashedPassword, _ := HashPassword("123456")

    employee := &entity.Employee{

        FirstName: "shubaba",

        LastName:  "booboo",
        
        Email: "shabuuu@gmail.com",

        Gender_id: 1,

        Position_id: 1,

        Password: hashedPassword,

    }

    db.FirstOrCreate(employee, &entity.Employee{Email: "shabuuu@gmail.com"})

}