# 🧊 Rubik’s Cube Library Database

## 📚 Description of the Schema

This database schema represents a simple **Rubik’s Cube library**. It is designed to track:
- Rubik’s cube models
- Their associated brands
- Ownership information

This schema is ideal for learning basic **relational database design** using MySQL. It uses **three interrelated tables** with clear foreign key relationships and a minimal, beginner-friendly structure.

---

## 🗂️ Table Structure

### 🧱 Table: `cubes`

Stores individual Rubik’s cube models and their key properties.

| Column        | Type     | Description                            |
|---------------|----------|----------------------------------------|
| `id`          | INT      | Primary key (auto-incremented)         |
| `brand_id`    | INT      | Foreign key referencing `brands.id`    |
| `name`        | VARCHAR  | Model name (e.g., "WRM", "356 XS")     |
| `size_mm`     | INT      | Cube size in millimeters (e.g., 55)    |
| `stickerless` | BOOLEAN  | Whether the cube is stickerless        |

---

### 🧱 Table: `brands`

Stores Rubik’s cube brand/manufacturer information.

| Column     | Type     | Description                         |
|------------|----------|-------------------------------------|
| `id`       | INT      | Primary key (auto-incremented)      |
| `name`     | VARCHAR  | Brand name (e.g., Gan, Moyu)        |
| `country`  | VARCHAR  | Country of origin for the brand     |

---

### 🧱 Table: `owners`

Stores ownership records linking cubes to real people.

| Column       | Type     | Description                            |
|--------------|----------|----------------------------------------|
| `cube_id`    | INT      | Foreign key referencing `cubes.id`     |
| `owner_name` | VARCHAR  | Name of the person who owns the cube   |

---

## ✅ Notes

- The `brand_id` in `cubes` references the `brands` table.
- The `cube_id` in `owners` references the `cubes` table.
- `ON DELETE SET NULL` or `ON DELETE CASCADE` behavior can be configured based on application needs.

---

