using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pet4YouAPI.Models;

namespace Pet4YouAPI.DBContext;

public class Pet4YouContext : DbContext
{
    public Pet4YouContext()
    {
    }

    public Pet4YouContext(DbContextOptions<Pet4YouContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Advertisement> Advertisements { get; set; }

    public virtual DbSet<AdvertisementCriterion> AdvertisementCriteria { get; set; }

    public virtual DbSet<AdvertisementDeleting> AdvertisementDeletings { get; set; }

    public virtual DbSet<AdvertisementLocation> AdvertisementLocations { get; set; }

    public virtual DbSet<Criteria> Criterias { get; set; }

    public virtual DbSet<OrderRequest> OrderRequests { get; set; }

    public virtual DbSet<Rating> Ratings { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserInfo> UserInfos { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Advertisement>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.PublicationDate).HasColumnType("datetime");
            entity.Property(e => e.Title).HasMaxLength(120);
            entity.Property(e => e.Type).HasMaxLength(10);

            entity.HasOne(d => d.User).WithMany(p => p.Advertisements)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<AdvertisementCriterion>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Value).HasMaxLength(150);

            entity.HasOne(d => d.Advertisement).WithMany(p => p.AdvertisementCriteria)
                .HasForeignKey(d => d.AdvertisementId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(d => d.Criteria).WithMany(p => p.AdvertisementCriteria)
                .HasForeignKey(d => d.CriteriaId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<AdvertisementDeleting>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.ToTable("AdvertisementDeleting");

            entity.Property(e => e.DeleteDate).HasColumnType("datetime");
            entity.Property(e => e.Reason).HasMaxLength(200);

            entity.HasOne(d => d.AdminUser).WithMany()
                .HasForeignKey(d => d.AdminUserId);

            entity.HasOne(d => d.Advertisement).WithMany(p => p.AdvertisementDeletings)
                .HasForeignKey(d => d.AdvertisementId)
                .OnDelete(DeleteBehavior.SetNull);
        });

        modelBuilder.Entity<AdvertisementLocation>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.City).HasMaxLength(60);
            entity.Property(e => e.Country).HasMaxLength(60);
            entity.Property(e => e.Region).HasMaxLength(60);

            entity.HasOne(d => d.IdNavigation).WithOne(p => p.AdvertisementLocation)
                .HasForeignKey<AdvertisementLocation>(d => d.Id);
        });

        modelBuilder.Entity<Criteria>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Name).HasMaxLength(20);
        });

        modelBuilder.Entity<OrderRequest>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Message).HasMaxLength(1000);
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.Advertisement).WithMany(p => p.OrderRequests)
                .HasForeignKey(d => d.AdvertisementId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(d => d.User).WithMany(p => p.OrderRequests)
                .HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<Rating>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.RatingDate).HasColumnType("datetime");

            entity.HasOne(d => d.RaterUser).WithMany(p => p.RatingRaterUsers)
                .HasForeignKey(d => d.RaterUserId);

            entity.HasOne(d => d.RecipientUser).WithMany(p => p.RatingRecipientUsers)
                .HasForeignKey(d => d.RecipientUserId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Login)
                .HasMaxLength(60)
                .IsUnicode(false);
            entity.Property(e => e.PasswordHash)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.RegistrationDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<UserInfo>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.ToTable("UserInfo");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Biography).HasMaxLength(1500);
            entity.Property(e => e.DateOfBirth).HasColumnType("date");
            entity.Property(e => e.Email).HasMaxLength(60);
            entity.Property(e => e.FirstName).HasMaxLength(80);
            entity.Property(e => e.LastName).HasMaxLength(80);
            entity.Property(e => e.PatronymicName).HasMaxLength(80);
            entity.Property(e => e.Phone).HasMaxLength(20);
            entity.Property(e => e.ProfileImageSource).HasMaxLength(256);
            entity.Property(e => e.Sex).HasMaxLength(10);

            entity.HasOne(d => d.User).WithOne(p => p.UserInfo)
                .HasForeignKey<UserInfo>(d => d.Id);
        });
    }
}
