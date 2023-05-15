import java.io.*;
import java.lang.Process;
public class Utils {
    int m_x;

    public Utils(int x) {
        m_x = x;
    }

    // public static void main(String[] args) {
    //     System.out.println("Hello World");
    // }

    // public static int exec(String command) throws InterruptedException, IOException {
    //     Runtime run = Runtime.getRuntime();
    //     Process proc = run.exec(new String[]{"/bin/bash", "-c", command});
    //     proc.waitFor();
    //     return proc.exitValue();
    // }

    public int nonStatic() {
        return m_x;
    }

    public int nonStatic1(int i) {
        return i+1;
    }
}