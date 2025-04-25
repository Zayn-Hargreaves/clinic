-- Tạo bảng patients (nếu chưa có)
CREATE TABLE IF NOT EXISTS patients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    gender ENUM('MALE', 'FEMALE', 'OTHER'),
    phone VARCHAR(20)
);

-- Tạo bảng doctors
CREATE TABLE IF NOT EXISTS doctors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    specialty VARCHAR(100)
);

-- Tạo bảng appointments
CREATE TABLE IF NOT EXISTS appointments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT,
    doctor_id INT,
    appointment_date DATETIME NOT NULL,
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

-- Tạo bảng suppliers
CREATE TABLE IF NOT EXISTS suppliers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    contact_info TEXT
);

-- Tạo bảng medicines
CREATE TABLE IF NOT EXISTS medicines (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL
);

-- Tạo bảng medical_supplies
CREATE TABLE IF NOT EXISTS medical_supplies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL
);

-- Tạo bảng import_vouchers
CREATE TABLE IF NOT EXISTS import_vouchers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    supplier_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);

-- Tạo bảng import_details
CREATE TABLE IF NOT EXISTS import_details (
    id INT PRIMARY KEY AUTO_INCREMENT,
    import_voucher_id INT,
    medical_supply_id INT,
    medicine_id INT,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (import_voucher_id) REFERENCES import_vouchers(id),
    FOREIGN KEY (medical_supply_id) REFERENCES medical_supplies(id),
    FOREIGN KEY (medicine_id) REFERENCES medicines(id)
);

-- Insert dữ liệu ảo
-- Patients
INSERT INTO patients (name, date_of_birth, gender, phone) VALUES
('Nguyen Van A', '1990-05-15', 'MALE', '0901234567'),
('Tran Thi B', '1985-08-20', 'FEMALE', '0912345678'),
('Le Van C', '2000-03-10', 'MALE', '0923456789');

-- Doctors
INSERT INTO doctors (name, specialty) VALUES
('Dr. Pham Minh D', 'Cardiology'),
('Dr. Hoang Thi E', 'Pediatrics'),
('Dr. Vu Van F', 'Neurology');

-- Appointments
INSERT INTO appointments (patient_id, doctor_id, appointment_date, reason) VALUES
(1, 1, '2025-04-26 10:00:00', 'Checkup'),
(2, 2, '2025-04-26 11:00:00', 'Fever'),
(3, 3, '2025-04-27 09:00:00', 'Headache');

-- Suppliers
INSERT INTO suppliers (name, contact_info) VALUES
('Supplier A', 'contact@suppliera.com'),
('Supplier B', 'contact@supplierb.com'),
('Supplier C', 'contact@supplierc.com');

-- Medicines
INSERT INTO medicines (name, description, price) VALUES
('Paracetamol', 'Pain relief', 5.00),
('Amoxicillin', 'Antibiotic', 10.00),
('Ibuprofen', 'Anti-inflammatory', 7.50);

-- Medical Supplies
INSERT INTO medical_supplies (name, description, price) VALUES
('Syringe', 'Disposable syringe', 2.00),
('Bandage', 'Sterile bandage', 3.50),
('Gloves', 'Medical gloves', 1.50);

-- Import Vouchers
INSERT INTO import_vouchers (supplier_id, created_at) VALUES
(1, '2025-04-01 08:00:00'),
(2, '2025-04-02 09:00:00'),
(3, '2025-04-03 10:00:00');

-- Import Details
INSERT INTO import_details (import_voucher_id, medical_supply_id, medicine_id, quantity, unit_price) VALUES
(1, NULL, 1, 100, 5.00),  -- 100 Paracetamol
(1, 1, NULL, 50, 2.00),   -- 50 Syringes
(2, NULL, 2, 200, 10.00), -- 200 Amoxicillin
(3, 2, NULL, 150, 3.50);  -- 150 Bandages