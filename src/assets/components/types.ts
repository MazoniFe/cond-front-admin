export interface IPrimaryRoundedButtonProps {
    value: string;
    callback: (e: unknown) => void;
}

export interface IDefaultInputProps {
    label: string;
    placeholder: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Accept event parameter
}

export interface IResidentUpdateFormData {
        residentEmail: string;
        tower: string;
        apartment: string;
        residentType: "OWNER" | "TENANT";
        fullName: string;
        phoneNumber: string;
        alternateEmail: string;
        spouseFullName: string;
        spousePhoneNumber: string;
        otherResidentsNames: string;
        hasVehicle: string;
        vehiclePlates: string;
        parkingSpot:  string;
        comments:  string;
}


export interface IAlert {
    hidden: boolean;
    type: "SUCCESS" | "WARNING" | "ERROR";
    title: string;
    message: string;
}

export interface Resident {
    id: number;
    resident_email: string;
    tower: string;
    apartment: string;
    residentType: "OWNER" | "TENANT"; 
    fullName: string;
    phoneNumber: string;
    alternateEmail: string;
    spouseFullName: string;
    spousePhoneNumber: string;
    otherResidentsNames: string;
    hasVehicle: string; 
    vehiclePlates: string;
    parkingSpot: string;
    comments: string;
    updateDate: string; 
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export interface loginResponse {
    message: string;
    token: string;
}


export interface Pageable<T> {
    content: T[];
    pageNumber: number;
    pageSize: number;
    sort: {
        empty: boolean;
        unsorted: boolean;
        sorted: boolean;
    };
    offset: number;
    unpaged: boolean;
    paged: boolean;
}

export interface ResponseData {
    content: Resident[];
    pageable: Pageable<unknown>;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}
