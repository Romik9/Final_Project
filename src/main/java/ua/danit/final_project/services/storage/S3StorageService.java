package ua.danit.final_project.services.storage;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ua.danit.final_project.entities.Employee;
import ua.danit.final_project.entities.EmployeeImage;
import ua.danit.final_project.entities.Task;
import ua.danit.final_project.entities.TaskImage;
import ua.danit.final_project.repositories.EmployeeImageRepository;
import ua.danit.final_project.repositories.TaskImageRepository;

import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Service
public class S3StorageService implements StorageService {

  private final FileStorageProperties storageProperties;
  private final TaskImageRepository taskImageRepository;
  private final EmployeeImageRepository employeeImageRepository;

  @Value("${aws.bucket}")
  private String bucket;

  @Autowired
  public S3StorageService(FileStorageProperties storageProperties,
                          TaskImageRepository taskImageRepository,
                          EmployeeImageRepository employeeImageRepository) {
    this.storageProperties = storageProperties;
    this.taskImageRepository = taskImageRepository;
    this.employeeImageRepository = employeeImageRepository;
  }


  @Override
  public TaskImage storeTaskImage(@NotNull MultipartFile file, Task task) throws IOException {

    AmazonS3 s3 = storageProperties.getAmazonS3();

    String key = "taskPhotos/" + UUID.randomUUID();
    key += getOriginalFileExtension(file);
    InputStream is = file.getInputStream();
    s3.putObject(new PutObjectRequest(bucket, key, is, new ObjectMetadata())
        .withCannedAcl(CannedAccessControlList.PublicRead));

    String url = s3.getUrl(bucket, key).toString();

    TaskImage img = new TaskImage();
    img.setUrl(url);
    img.setAwsKey(key);
    img.setTask(task);

    return taskImageRepository.save(img);
  }

  @Override
  public EmployeeImage storeEmployeeImage(MultipartFile file, Employee employee) throws IOException {
    AmazonS3 s3 = storageProperties.getAmazonS3();

    String key = "employeePhotos/" + UUID.randomUUID();
    key += getOriginalFileExtension(file);
    InputStream is = file.getInputStream();
    s3.putObject(new PutObjectRequest(bucket, key, is, new ObjectMetadata())
        .withCannedAcl(CannedAccessControlList.PublicRead));

    String url = s3.getUrl(bucket, key).toString();

    EmployeeImage img = new EmployeeImage();
    img.setUrl(url);
    img.setAwsKey(key);
    img.setEmployee(employee);

    return employeeImageRepository.save(img);
  }

  private String getOriginalFileExtension(@NotNull MultipartFile file) {
    String originalFilename = file.getOriginalFilename();
    String extension = null;

    if (originalFilename != null) {
      String[] nameParts = originalFilename.split("\\.");

      extension = nameParts.length > 1
          ? "." + nameParts[nameParts.length - 1]
          : null;
    }
    return extension;
  }
}
