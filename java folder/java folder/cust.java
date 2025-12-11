import java.util.*;

public class cust{
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);

        int phone = 30000;
        int laptop = 50000;
        int computer = 20000;
        int earbuds = 3000;
        int watch = 5000;
        int television = 10000;

        System.out.println("Enter the number of items you want to buy:");
        int itemCount = sc.nextInt();

        int total = 0;

        for (int i = 1; i <= itemCount; i++) {
            System.out.println("\nSelect item " + i + " from the list:");
            System.out.println("1. Phone       - rs" + phone);
            System.out.println("2. Laptop      - rs" + laptop);
            System.out.println("3. Computer    - rs" + computer);
            System.out.println("4. Earbuds     - rs" + earbuds);
            System.out.println("5. Watch       - rs" + watch);
            System.out.println("6. Television  - rs" + television);
            System.out.print("Enter item number (1-6): ");

            int choice = sc.nextInt();

            switch (choice) {
                case 1:
                    total += phone;
                    break;
                case 2:
                    total += laptop;
                    break;
                case 3:
                    total += computer;
                    break;
                case 4:
                    total += earbuds;
                    break;
                case 5:
                    total += watch;
                    break;
                case 6:
                    total += television;
                    break;
                default:
                    System.out.println("Invalid choice! Skipping this item.");
            }
        }

        double discount = 0;
        if (total > 2000) {
            discount = total * 0.10;  // 10% discount
        }

        double discountedTotal = total - discount;
        double deliveryCharge = (discountedTotal > 2500) ? 0 : 150;
        double finalAmount = discountedTotal + deliveryCharge;

        System.out.println("\n Order Summary:");
        System.out.println("Total cost before discount: rs " + total);
        System.out.println("Discount applied: rs " + discount);
        System.out.println("Total after discount: rs " + discountedTotal);
        System.out.println("Delivery Charges: rs" + deliveryCharge);
        System.out.println("Final Amount to Pay: rs" + finalAmount);

        sc.close();
    }
}
