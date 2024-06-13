import java.util.ArrayList;
import java.util.Random;

public class Buggy {
    public static void main(String[] args) {
        ArrayList<Integer> arr = new ArrayList<>();

        Random r = new Random();
        for(int i=0; i<1000000; i++) {
            int num = r.nextInt(10);
            arr.add(num);
        }

        boolean cond1 = checkCond1(arr.get(1));
        boolean cond2 = checkCond2(arr.get(2));
        boolean cond3 = checkCond3(arr.get(3));

        int arrSize1 = arr.size();
        for(int i=0; i<arrSize1; i++) {
            System.out.println(arr.get(i));
            if (cond1 && cond2 && cond3) {


                        System.out.println("Hello");


            }
        }

       
    }

    public static boolean checkCond1(Integer x) {
        return x < 9;
    }

    public static boolean checkCond2(Integer x) {
        return x < 5;
    }

    public static boolean checkCond3(Integer x) {
        return x < 3;
    }
}
