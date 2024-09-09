package entity

import (
    "gorm.io/gorm"
)

type TableStatus struct {

    gorm.Model
    Status 		string 		`json:"status"`
    Tables 		[]Table 	`gorm:"foreignKey:TableStatusID"`

}
