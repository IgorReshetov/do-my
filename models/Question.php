<?php

class Question 
{
    public $id;
    public $title;
    public $description;
    public $image;
    public $price;
    public $category_id;
    public $collection;

    public function __construct($id)
    {
        global $mysqli;

        $query = "SELECT product_id, title, description, image, price, category_id, collection FROM products WHERE product_id=$id";
        $result = $mysqli->query($query);

        if ($result->num_rows > 0) {
            $product_data = $result->fetch_assoc();

            $this->id = $product_data['product_id'];
            $this->title = $product_data['title'];
            $this->description = $product_data['description'];
            $this->image = $product_data['image'];
            $this->price = $product_data['price'];
            $this->category_id = $product_data['category_id'];
            $this->collection = $product_data['collection'];
        }
    }

    public static function getAll($collection = false, $category_id = false, $order_id = false, $title = false, $price_min = false, $price_max = false, $page = false, $count_items = false)
    {
        global $mysqli;

        if ($page !== false) {
            --$page;
        }
                
        $conditions = "";
        $tables = "products p";

        if ($collection !== false) {
            $conditions .= " AND p.collection=$collection";
        }
        if ($category_id !== false) {
            $conditions .= " AND p.category_id=$category_id";
        }
        if ($order_id !== false) {
            $tables .= ", order_products op";
            $conditions .= " AND op.order_id=$order_id AND op.product_id=p.product_id";
        }

        if ($title !== false) {
           $conditions .= " AND p.title LIKE '%$title%'";
        }
        
        if ($price_min !== false && $price_max !== false) {
            $conditions .= " AND p.price >= $price_min AND p.price <= $price_max";
        }

        $query = "SELECT MAX(price) as max_price FROM $tables WHERE 1 $conditions";
        $result = $mysqli->query($query);
        $max_price = $result->fetch_assoc();
                  
        $query = "SELECT MIN(price) as min_price FROM $tables WHERE 1 $conditions";
        $result = $mysqli->query($query);
        $min_price = $result->fetch_assoc();
       
        $query = "SELECT COUNT(*) as count FROM $tables WHERE 1 $conditions";
        $result = $mysqli->query($query);
        $count_data = $result->fetch_assoc();
        if ($count_data['count'] < $page * $count_items) {
            return false;
         }
 
         if ($page !== false) {
             $limit = " LIMIT " . ($page * $count_items) . ", " . $count_items;
         } else {
             $limit = " LIMIT " . 0 . ", " . $count_items;;
         }
         
        $query = "SELECT p.product_id FROM $tables WHERE 1 $conditions $limit";
        $result = $mysqli->query($query);

        $products = [];
        while ($product_data = $result->fetch_assoc()) {
            $products[] = new self($product_data['product_id']);
        }
        

        return 
        [
            'products' => $products, 
            'count' => $count_data['count'],
            'max_price' => $max_price['max_price'],
            'min_price' => $min_price['min_price'],
        ];
        
    }

    public function add($title, $description, $image, $price, $category_id, $collection)
    {
        global $mysqli;

        $query = "INSERT INTO products (title, description, image, price, category_id, collection)
                  VALUES ('$title', '$description', '$image', $price, $category_id, $collection)";
        $result = $mysqli->query($query);

        if($result) {
            return true;
        } else {
            return false;
        }
    }

    public function delete()
    {
        global $mysqli;

        $id = $this->id;

        $query = "DELETE FROM products WHERE product_id=$id";
        $result = $mysqli->query($query);
    }

    public function update($title=false, $description=false, $image=false, $price=false, $category_id=false, $collection=false)
    {
        $id = $this->id;
        
        $condition = [];
        if($title != false) {
            $condition[] = "p.title='$title'";
        }
        if($description != false) {
            $condition[] = "p.description='$description'";
        }
        if($image != false) {
            $condition[] = "p.image='$image'";
        }
        if($price != false) {
            $condition[] = "p.price='$price'";
        }
        if($category_id != false) {
            $condition[] = "p.category_id='$category_id'";
        }
        if($collection != false) {
            $condition[] = "p.collection='$collection'";
        }

        $condition = implode(",", $condition);

        global $mysqli;

        $query = "UPDATE products p SET $condition WHERE p.product_id=$id";
        $result = $mysqli->query($query);

        if($result) {
            $product = new self($id);
            return $product;
        } else {
            return false;
        }
    }
}