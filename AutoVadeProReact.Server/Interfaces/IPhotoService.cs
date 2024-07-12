using CloudinaryDotNet.Actions;

namespace AutoVadeProReact.Server.Interfaces 
{
    public interface IPhotoService
    {
        Task<ImageUploadResult> AddPhotoAsync(IFormFile file);
        Task<DeletionResult> DeletePhotoAsync(string publicId);
    }
}
