import java.util.ArrayList;
public class Buggy {
    public static void main(String[] args) {
        int[][] matrix = new int[10][10];

        // ����� �ʱ�ȭ
        for (int i = 0; i < 10; i++) {
            for (int j = 0; j < 10; j++) {
                matrix[i][j] = i + j;
            }
        }

        int sum = 0;
        // ��ȿ������ ��ø �ݺ���: ���ʿ��� ���� üũ�� ���� ����
        for (int i = 0; i < 10; i++) {
            for (int j = 0; j < 10; j++) {
                for (int k = 0; k < 10; k++) {
                    if (i < 10 && j < 10) {
                        sum += matrix[i][j];
                    }
                }
            }
        }

        System.out.println("Sum: " + sum);
    }
}
