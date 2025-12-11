public class sorting{
    public static void main(String[] args) {
        int[] arr = {2, 4, 6, 8, 10, 12, 14}; // Sorted array
        int key = 12; // Element to search

        int low = 0;
        int high = arr.length;
        boolean found = false;

        while (low <= high) {
            int mid = (low + high) / 2;

            if (arr[mid] == key) {
                System.out.println("Element found at index: " + mid);
                found = true;
                break;
            } else if (arr[mid] < key) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        if (!found) {
            System.out.println("Element not found.");
        }
    }
}
